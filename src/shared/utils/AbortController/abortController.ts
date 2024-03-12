let controller = new AbortController()

export const getControllerSignal = () => controller.signal

export const abortController = () => controller.abort()

export const reInitController = () => {
  controller = new AbortController()
}
