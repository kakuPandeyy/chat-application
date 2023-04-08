import React from 'react'
import styled from 'styled-components'
import theme from '../style/theme';
import SearchStyle from '../style/style-component/SearchStyle';
export default function Search({setSearchInput}) {
  return (
    <SearchStyle  type="search"  placeholder='search your friend' onChange={ (e)=>{setSearchInput(e.target.value); }  }>

      </SearchStyle>
  )
}
