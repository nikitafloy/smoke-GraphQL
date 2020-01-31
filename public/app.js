const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

const buttons = document.querySelectorAll("button")
for (i=0;i < buttons.length;i++){buttons[i].addEventListener("click", btnHandler)}
function update(){
    fetch('/graphql', {
        method: 'post',
        headers,
        body: JSON.stringify({ query: `{getAll {name count}}` })
    })
        .then(res => res.json())
        .then(response => {
            const ulElements = document.querySelector("div.tobacco ul")
            ulElements.innerHTML = response.data.getAll.map(el => {return `<li>${el.name} ( Количество: <strong>${el.count}</strong> )</li>`}).join(' ')
        })
        .catch(e => console.log(e))    
}
update()

function getPromptCount(){
    let count = prompt("Введите количество")
    count = parseInt(count)
    if (!count || count < 1) return alert("Неверное количество")
    return count
}

function btnHandler(event) {
    const btnName = event.target.innerText
    const inputValue = document.querySelector("input").value
    if (btnName === "УМЕНЬШИТЬ"){
        const count = getPromptCount()
        if (count) {
            fetch('/graphql', {
                method: 'post', headers,
                body: JSON.stringify({ query: `{decreaseCount(name: "${inputValue}", count: "${count}")}` })
            })
                .then(res => res.json())
                .then(response => {
                    alert(response.data.decreaseCount)
                    update()
                })    
        }
    } else if (btnName === "КОЛИЧЕСТВО") {
        fetch('/graphql', {
            method: 'post', headers,
            body: JSON.stringify({ query: `{getCount(name: "${inputValue}")}` })
        })
            .then(res => res.json())
            .then(response => alert(response.data.getCount))

    } else if (btnName === "ДОБАВИТЬ") {
        const count = getPromptCount()
        if (count) {
            fetch('/graphql', {
                method: 'post', headers,
                body: JSON.stringify({ query: `{increaseCount(name: "${inputValue}", count: "${count}")}` })
            })
                .then(res => res.json())
                .then(response => {
                    alert(response.data.increaseCount)
                    update()
                })
        }

    } else if (btnName === "УДАЛИТЬ") {
        if (confirm("Вы действительно хотите списать табак?")) {
            fetch('/graphql', {
                method: 'post', headers,
                body: JSON.stringify({ query: `{removeTabacco(name: "${inputValue}")}` })
            })
                .then(res => res.json())
                .then(response => {
                    alert(response.data.removeTabacco)
                    update()
                })
        }
    } else if (btnName === "НОВЫЙ ТАБАК") {
        fetch('/graphql', {
            method: 'post', headers,
            body: JSON.stringify({ query: `{addTobacco(name: "${inputValue}")}` })
        })
            .then(res => res.json())
            .then(response => {
                alert(response.data.addTobacco)
                update()
            })
    }
}