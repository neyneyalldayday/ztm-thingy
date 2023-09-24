import axios from "axios"

export  interface LocationInfo {
    lat: string;
    lon: string;
    display_name: string;
}


export async function fetchLocationData(
    apiUrl: string,
    locationName: string,
): Promise<LocationInfo>  {
    const options = {
        method: "GET",
        url: apiUrl,
        params: {
            q: locationName
        }
    };
    const response = await axios.request<LocationInfo[]>(options)

    if (response.status === 200){
        if(response.data.length > 0) {
          return response.data[0]  
        } else {
            throw new Error(`unable to find location info for ${locationName}`)
        }
    } else {
        throw new Error('failed to fetch location shit')
    }
}