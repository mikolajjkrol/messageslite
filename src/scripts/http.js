export async function fetchData(){
    const response = await fetch('https://mikolajjkrol.pythonanywhere.com/get-messages');
    const resData = await response.json();
    
    if(!response.ok){
        throw new Error('Failed to fetch data.')
    }

    return resData
}

export async function sendData(data) {
    const response = await fetch('https://mikolajjkrol.pythonanywhere.com/post-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to upload data.')
    }

    return resData.message;
}