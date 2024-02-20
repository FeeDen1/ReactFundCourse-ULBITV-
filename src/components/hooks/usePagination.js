import {useMemo} from "react";

export const usePagination   = (totalPages) => {
  let pagesArray = []
  const createPages = useMemo(() => {

    for(let i = 1;i <= totalPages ; i++){
      pagesArray.push(i)
    }

    return pagesArray
  }, [totalPages])

  return createPages

}