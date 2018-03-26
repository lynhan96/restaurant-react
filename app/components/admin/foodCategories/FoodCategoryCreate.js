import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'

import { isAdmin } from 'components/wrappers/isAdmin'
import { editFieldInfo, selectFieldData } from '../../../lib/actions/foodCategory'
import { createFoodCategory } from 'lib/actions/foodCategory'
import TableCreateItem from 'components/admin/table/TableCreateItem'

class FoodCategoryCreate extends ReactQueryParams {
  render() {
    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <TableCreateItem
            editFieldInfo={editFieldInfo()}
            selectFieldData={selectFieldData()}
            editHeader='Thêm Danh Mục Thức Ăn'
            subHeader=''
            submitCreate={createFoodCategory}
            arrLink={{ list: 'food-categories' }}
          />
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(FoodCategoryCreate)
