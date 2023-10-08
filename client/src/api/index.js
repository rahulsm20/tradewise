import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const fetchStocks = async (user_id) => {
  const result = await api.get(`stocks/${user_id}`);
  return result;
};

export const insertStock = async(user_id,stock)=>{
  const result = await api.post(`stocks/${user_id}`,{
    symbols:stock
  })
  return result
}

export const decodeUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      verify:false
    },
  };
  try{
      const result = await api.post(`auth/check`,{},config);
      const {email,user_id,username} = result.data
      return {email,user_id,username};
  }
  catch(err){
    console.error("Error decoding user:",err)
    throw err;
  }
};

export const verifyUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      verify:true
    },
  };
  try{
      const result = await api.post(`auth/check`,{},config);
      const {email,user_id,username} = result.data
      return {email,user_id,username};
  }
  catch(err){
    console.error("Error decoding user:",err)
    throw err;
  }
};

export const fetchBudgetData = (username) => api.get(`budget/${username}`);

// export const 