export const postHospital = (data) => {
    fetch("http://localhost:5000/donateitems", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((d) => console.log(d));
  };
  
  export const getAllDonateItems = async () => {
    const res = await fetch("http://localhost:5000/donateitems");
    return await res.json();
  };
  
  export const holdItem = async (id, holdDetails) => {
    fetch(`http://localhost:5000/things/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Pending" }),
    });
  
    const res = await fetch("http://localhost:5000/takings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(holdDetails),
    });
    return await res.json();
  };
  
  export const donateItemStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/things/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(status),
    });
    return await res.json();
  };
  
  export const getUserDonateItems = async (email) => {
    const res = await fetch(`http://localhost:5000/donateitems/${email}`);
    return await res.json();
  };
  
  export const getTakeItems = async (email) => {
    const res = await fetch(`http://localhost:5000/takings/${email}`);
    return await res.json();
  };
  
  export const takeStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/taking/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(status),
    });
    return await res.json();
  };
  
  export const deleteDonateItem = (id) => {
    fetch(`http://localhost:5000/things/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  };
  
  export const delTakeItem = (id) => {
    fetch(`http://localhost:5000/taking/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  };