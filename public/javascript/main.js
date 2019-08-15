$(document).ready(() => {
    const form = $("#form");
    const form2 = $("#form2");
    const input = $("#input");
    const sec1 = $("#sec1");
    const sec2 = $("#sec2");

    const buildTemplate = (doc) => {
        return `<input type = "radio" name = "candidate" value = "0">${doc._candidates[0].__name} | ${doc._candidates[0].__partyName}<br>
        <input type = "radio" name = "candidate" value = "1">${doc._candidates[1].__name} | ${doc._candidates[1].__partyName}<br>
        <input type = "radio" name = "candidate" value = "2">${doc._candidates[2].__name} | ${doc._candidates[2].__partyName}<br>
        <input type = "radio" name = "candidate" value = "3">${doc._candidates[3].__name} | ${doc._candidates[3].__partyName}<br>
        <button type = "submit">Submit</button>`;
    }

    form.submit((e) => {
        e.preventDefault();
        fetch(`/${input.val()}`, {
            method : "get",
            headers : {
                "Content-Type" : "application/json; charset = utf-8"
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            form2.append(buildTemplate(data));
        }).then(() => {
            sec1.hide();
        });
    });
});