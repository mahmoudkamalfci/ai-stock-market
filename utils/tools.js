export async function getCurrentWeather({location = "Cairo", unit = "F"}) {
    const weather = {
        temperature: location === "Cairo" ? "75" : "10",
        unit: unit,
        forecast: location === "Cairo" ? "sunny" : "cloudy"
    }
    return JSON.stringify(weather)
}

export async function getLocation() {
    return "Cairo"
}

export const tools = [
    {
        type: "function",
        name: "getCurrentWeather",
        description: "Get the current weather for a specific location",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city or location name (e.g., 'Paris', 'Cairo') from where to get the weather",
                },
            },
            required: ["location"],
            additionalProperties: false,
        },
        strict: true,
    },
    {
        type: "function",
        name: "getLocation",
        description: "Get the user's current location",
        parameters: {
            type: "object",
            properties: {},
            additionalProperties: false,
        },
        strict: true,
    },
]