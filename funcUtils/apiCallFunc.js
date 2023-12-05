

export async function getTaskData(){
    
    const data = await fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        headers: {
            "content-type":"appliction/json; charset=UTF-8", 
        },
        next: {
            revalidate: 1
        }
    })
    console.log("API")

    return await data.json()
}