export async function getCurrentWeather() {
    const weather = {
        temperature: "75",
        unit: "F",
        forecast: "sunny"
    }
    return JSON.stringify(weather)
}

export async function getLocation() {
    return "San Diego, CA"
}

export const tools = [
    {
        type: "function",
        name: "getCurrentWeather",
        function: {
            name: "getCurrentWeather",
            description: "Get the current weather",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    {
        type: "function",
        name: "getLocation",
        function: {
            name: "getLocation",
            description: "Get the user's current location",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
]