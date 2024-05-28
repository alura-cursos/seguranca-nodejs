import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const postData = async (data) => {
  return await axios.post('https://dmd4gp-3333.csb.app/login', data)
}

export function useRegisterMutate(){
    const mutate = useMutation({
      mutationFn: postData
    })
    return mutate
  };
  