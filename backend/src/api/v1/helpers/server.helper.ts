import detect from "detect-port"

export const checkServerPort = (port: number): Promise<string> => {
	return new Promise((resolve) => {
		detect(port)
			.then((_port: number) => {
				if (port === _port) {
					resolve("Offline")
				} else {
					resolve("Online")
				}
			})
			.catch((err: Error) => {
				console.error(`Error when checking server port: ${err}`)
			})
	})
}

