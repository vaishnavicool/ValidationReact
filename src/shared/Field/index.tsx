import { filter } from "lodash"
import { FormattedMessage, useIntl } from "react-intl"
import Select from "react-select"
import "./style.scss"
function Field(props: any) {
  const { name, type = "text", updateFilters, filters, allDropdownOpts,width='col-6',infoKey } = props
  let intl = useIntl()
  let aName = intl.formatMessage({
    defaultMessage: `leftpanel.${name}`,
    id: `leftpanel.${name}`,
  })
  let value = ""
  if (type == "dropdown" && allDropdownOpts) {
    value = allDropdownOpts[name]?.find((d:any) => d.value == filters[name])
    if (!value) value = ""
    return (
      <div className="mb-3 custom-group col-6">
        <label htmlFor="disabledTextInput" className="label">
          <FormattedMessage id={`leftpanel.${name}`} />
        </label>
        <Select
          onChange={updateFilters(name)}
          placeholder={`Select ${aName}`}
          value={value}
          className="basic-single input"
          options={allDropdownOpts[name]}
          isLoading={!allDropdownOpts[name]?.[0]}
        />
      </div>
    )
  }

  if(filters)
    value = filters[name]
  if (!value) value = ""
  return (
    <div className={`mb-3 custom-group ${width}`}>
      <label htmlFor="disabledTextInput" className="label">
        <FormattedMessage id={`leftpanel.${name}`} />
      </label>
      <input
        type={type}
        id="disabledTextInput"
        className="input"
        placeholder={`Enter ${aName}`}
        name={name}
        // onChange={updateFilters(name)}
        value={value}
      />
      {infoKey && <div className="info-txt"><FormattedMessage id={infoKey} /></div>}
    </div>
  )
}
export default Field