let n = axios.get(`https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple`)

n.then((data) =>{
    console.log(n)
    return data.data.results
})
.then((quesAndAnswer)=> {
    let data1 = "";
    quesAndAnswer.map((values)=> {
        data1+= `
        <h3 class = "questions">${values.question}</h3>
        <p class = "incorrect">${values.incorrect_answers}
        <p class = "correct">${values.incorrect_answers}
        
        `;
    })
    document.getElementById("container").innerHTML=data1;
})

let x = axios.get(``)
