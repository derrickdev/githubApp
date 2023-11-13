function getData(inputValue){
  let url = `https://api.github.com/users/${inputValue}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      }).catch (e) ={
        console.log(e)
      }
    };