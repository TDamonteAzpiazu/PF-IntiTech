const api_url = process.env.NEXT_PUBLIC_API_URL

export interface Idata_google{
          name:string,
          email:string,
}

export async function auth_google(get_data:Idata_google) {
          try {
               const response = await fetch(`${api_url}/auth/googleLogin`,{
                    method:'GET',
                    headers:{
                              'Content-Type': 'application/json',
                    },
          }) 
          return  response

} catch (error:any) {
                    throw new (error.message)
          }
}

export async function post_auth(google_data:any) {
          try{
                    const data = await fetch(`${api_url}/auth/login`,{
                          method:'POST',
                          headers:{
                              'Content-Type':'application/json',
                          },
                          body:JSON.stringify(google_data)
                    })
          } catch (error:any) {
                    throw new (error.message)
          }
}