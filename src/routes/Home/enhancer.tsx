import React, { useEffect, useState } from "react"
import { getDropdownOpts, getPageOpts } from "./config"

import _ from "lodash"
import api from "api"
import exportAsXls from "./excel"
import { formattedDate } from "shared"
import { toast } from "react-toastify"

const useEnhancer = () => {
  let pageKey = "workOrders"
  let pageOpts: any = getPageOpts(pageKey)
  let { defaultState } = pageOpts
  const [inactive, setInactive] = useState(true)
  const [tableData, setTableData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [collapse, setCollapse] = useState(false)
  const [filters, setFilters] = useState(defaultState)
  const [defaultSortFieldId, setDefaultSortFieldId] = useState(1)
  const [allDropdownOpts, setAllDropdownOpts] = useState({})
  const [selectedData, setSelectedData] = useState([])
  const [show, setShow] = useState(false)
  const [showActivity, setShowActivity] = useState(true)
  const [showColumn, setShowColumn] = useState(false)
  const [columnsVisible, setColumnsVisible] = useState([...pageOpts.columns])
  const [columnsData, setColumnsData] = useState([...pageOpts.columns])
  const [modalType, setModalType] = useState()

  const updateFilters = (name: string) => (evt: any) => {
    let filters2: any = { ...filters }
    if (evt.label) filters2[name] = evt.value
    else {
      let { type, checked, value } = evt.target
      filters2[name] = type === "checkbox" ? checked : value
    }
    setFilters(filters2)
  }

  const resetSort = () => {
    let element = document.getElementsByClassName("rdt_TableCol_Sortable")[0]
    if (element instanceof HTMLElement) {
      element.click()
    }
    setShow(false)
  }

  useEffect(() => {
    ;(async () => {
      let opts = await getDropdownOpts(pageKey)
      setAllDropdownOpts(opts)
    })()
  }, [])

  const handleFilterCollapse = () => {
    setInactive(!inactive)
  }

  const clearFilters = () => {
    setFilters({ ...defaultState })
  }

  const handleChange = async (d: any) => {
    let index = columnsData.findIndex((object: any) => object.name === d.name)
    columnsData[index].visible = !columnsData[index].visible
    let visibleColumns = columnsData.filter((x: any) => x.visible)
    setColumnsVisible(visibleColumns)
    setColumnsData(columnsData)
    gettableData()
  }
  const gettableData = async () => {
    Object.keys(filters).forEach((d) => {
      if (pageOpts.numerics[d]) {
        filters[d] = filters[d] - 0
      }
    })
    let data = await api[pageOpts.api_key]({
      loading_key: "tableData",
      ...filters,
    })

    let keepKeys = columnsVisible.map((d: any) => d.key)

    if (data[0]) {
      data.forEach((d1, i1) => {
        Object.keys(d1).forEach((d2, i2) => {
          if (d2.toLocaleLowerCase().includes("date"))
            data[i1][d2] = formattedDate(data[i1][d2])
        })
        data[i1] = _.pick(data[i1], keepKeys)
      })
      setTableData(data)
      setShow(false)
    }
  }

  const updateSelectedData = (eve) => {
    setSelectedData(eve.selectedRows)
  }
  let pageConfig = {
    filter: {
      submitButtonTitle: "Apply Filters",
      title: "Add Filters",
      submitAction: gettableData,
      cancelButtonTitle: "Reset",
      cancelAction: clearFilters,
    },
    add: {
      submitButtonTitle: "Add",
      title: "Add WorkOrder",
      submitAction: "",
      cancelButtonTitle: "Cancel",
      cancelAction: "cancelAdd",
    },
  }

  const download = () => {
    let headerKeys = {}
    pageOpts.columns.forEach((d: any) => {
      headerKeys[d.key] = d.name
    })
    if (selectedData[0])
      exportAsXls(pageOpts.pageTitle, selectedData, headerKeys)
    else toast("Please select some rows to download the report")
    setShowActivity(false)
  }

  return {
    tableData,
    inactive,
    pageOpts,
    handleFilterCollapse,
    updateFilters,
    filters,
    setStartDate,
    startDate,
    collapse,
    setCollapse,
    gettableData,
    clearFilters,
    defaultSortFieldId,
    resetSort,
    allDropdownOpts,
    updateSelectedData,
    download,
    show,
    setShow,
    modalType,
    setModalType,
    pageConfig,
    showActivity,
    setShowActivity,
    setShowColumn,
    showColumn,
    handleChange,
    columnsVisible,
    setColumnsVisible,
    columnsData,
    setColumnsData,
  }
}

export default useEnhancer
