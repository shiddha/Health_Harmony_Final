export const postProfile = (email, data) => {
  fetch(`http://localhost:5000/users/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const lenderProfile = (userEmail, caution) => {
  fetch(`http://localhost:5000/users/${userEmail}`)
    .then((res) => res.json())
    .then((user) => {
      const updatecred = {
        credit: user?.credit + caution * 0.2,
        lendings: user?.lendings + 1,
      };
      postProfile(userEmail, updatecred);
    });
};

export const borrowerProfile = (id, caution, task) => {
  fetch(`http://localhost:5000/borrowItem/${id}`)
    .then((res) => res.json())
    .then((data) => {
      fetch(`http://localhost:5000/users/${data.borrowEmail}`)
        .then((res) => res.json())
        .then((user) => {
          if (task === "deduct") {
            const updateCred = {
              credit: user?.credit - caution,
              borrowings: user?.borrowings + 1,
            };
            postProfile(data.borrowEmail, updateCred);
          } else if (task === "return") {
            const updateCred = {
              credit: user?.credit + caution * 0.75,
            };
            postProfile(data?.borrowEmail, updateCred);
          }
        });
    });
};


export const giverProfile = (userEmail, caution) => {
  fetch(`http://localhost:5000/users/${userEmail}`)
    .then((res) => res.json())
    .then((user) => {
      const updatecred = {
        credit: user?.credit + caution * 0.2,
        givings: user?.givings + 1,
      };
      postProfile(userEmail, updatecred);
    });
};

export const takerProfile = (id, caution, task) => {
  fetch(`http://localhost:5000/takeItem/${id}`)
    .then((res) => res.json())
    .then((data) => {
      fetch(`http://localhost:5000/users/${data.takeEmail}`)
        .then((res) => res.json())
        .then((user) => {
          if (task === "deduct") {
            const updateCred = {
              credit: user?.credit - caution,
              takings: user?.takings + 1,
            };
            postProfile(data.takeEmail, updateCred);
          } else if (task === "return") {
            const updateCred = {
              credit: user?.credit + caution * 0.75,
            };
            postProfile(data?.takeEmail, updateCred);
          }
        });
    });
};