export const getIsFirmware = (state, props) => (
  typeof state.firmware.firmwareData.find(i => i.areaId === state.area.activeKey) === 'undefined'
)
export const getFirmware = (state) => state.firmware
