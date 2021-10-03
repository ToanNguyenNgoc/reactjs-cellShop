import {useEffect, useState} from 'react';

function useSearchTerm(searchTerm, list) {
      const [listBySearchTerm, setListBySearchTerm] = useState([])
      useEffect(()=>{
            async function handleSearchTerm(){
                  const result = list.filter(item => {
                        return Object.keys(item).some(key =>
                              item[key].toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
                        )
                  })
                  setListBySearchTerm(result);
            }
            handleSearchTerm()
      },[list, searchTerm])
      return listBySearchTerm
}

export default useSearchTerm;