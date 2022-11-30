import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URLSerializer } from "../lib/serializer";

export default function useURLParams<T>(serializer: URLSerializer<T>): [T, Dispatch<SetStateAction<T>>] {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<T>(serializer.deserialize(location.search));

  useEffect(() => {
    navigate(`${location.pathname}?${serializer.serialize(params)}`, {
      replace: true,
    });
  }, [location.pathname, navigate, serializer, params]);

  return [params, setParams];
}
