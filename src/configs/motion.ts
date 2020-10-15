import { Variants, Variant } from 'framer-motion'

enum MotionVariantStage {
  INITIAL = 'enter',
  ANIMATE = 'done',
  EXIT = 'exit'
}

// interface TimelineProp {
//   from?: TargetAndTransition
//   to: TargetAndTransition
//   exit?: TargetAndTransition
//   offset?: number
// }

const DefaultDuration = 0.3

interface IMotionStageProps {
  initial: MotionVariantStage
  animate: MotionVariantStage
  exit: MotionVariantStage
}

const MotionStageProps: Readonly<IMotionStageProps> = {
  initial: MotionVariantStage.INITIAL,
  animate: MotionVariantStage.ANIMATE,
  exit: MotionVariantStage.EXIT
}

Object.freeze(MotionStageProps)

function singleFloatPrecision(val: number) {
  return Number(val.toFixed(1))
}

function CreateVariants(init: Variant, anim: Variant, exit?: Variant): Variants {
  const variant = {
    [MotionVariantStage.INITIAL]: init,
    [MotionVariantStage.ANIMATE]: anim,
    [MotionVariantStage.EXIT]: exit
  }
  if (!exit) {
    delete variant[MotionVariantStage.EXIT]
  }
  return variant
}

class MotionTimeline {
  private length: number = 0
  private delay: number = 0
  private variants: { [key: string]: Variants } = {}
  private offsets: Map<string, number> = new Map()
  private durations: Map<string, number> = new Map()

  constructor(delay?: number) {
    this.delay = delay || 0
    this.length += this.delay
  }

  /**
   * add a variant to timeline
   * @param name variant name
   * @param prop variant config
   */
  public next(name: string, init: Variant, animate: Variant, exit?: Variant): MotionTimeline {
    this.handleAnimateProp(name, animate)
    this.variants[name] = CreateVariants(init, animate, exit)
    return this
  }

  private handleAnimateProp(name: string, animate: Variant) {
    const { transition } = animate
    let offset: number
    let duration: number
    let nextLength: number
    if (transition) {
      if (transition.duration) {
        duration = transition.duration
      } else {
        duration = DefaultDuration

        if (transition.delay) {
          offset = transition.delay
          nextLength = this.length
        } else {
          offset = this.length
          transition.delay = offset
          nextLength = offset + duration
        }
      }
    } else {
      offset = this.length
      duration = DefaultDuration
      nextLength = offset + duration
      animate.transition = { delay: offset }
    }
    this.offsets[name] = singleFloatPrecision(offset)
    this.durations[name] = singleFloatPrecision(duration)
    this.length = singleFloatPrecision(nextLength)
  }
  /**
   * export timeline to variant config
   */
  public build(): { [key: string]: Variants } {
    const { length, variants, offsets, durations } = this

    Object.keys(variants).forEach((k) => {
      const variant = variants[k]

      if (variant[MotionVariantStage.EXIT]) {
        const exit = variant[MotionVariantStage.EXIT]
        const delay = singleFloatPrecision(length - offsets[k] - durations[k])

        if (delay < 0) {
          throw Error(`${k} will be scheduled at negative time ${exit.delay}`)
        }
        if (!exit.transition) {
          exit.transition = { delay }
        } else if (!exit.transition.delay) {
          exit.transition.delay = delay
        }
      }
    })
    return JSON.parse(JSON.stringify(this.variants)) // make a copy of variants
  }
}

export { MotionVariantStage, MotionTimeline, CreateVariants, MotionStageProps }
