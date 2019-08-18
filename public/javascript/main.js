$(document).ready(() => {
    const form = $("#form");
    const form2 = $("#form2");
    const input = $("#input");
    const sec1 = $("#sec1");
    const sec2 = $("#sec2");

    const buildTemplate1 = (doc) => {
        return `<h3>Name : ${doc._name}</h3>
        <h3>Voter ID : ${doc._voterId}
        <br>`;
    }

    const buildTemplate2 = (doc) => {
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
            sec1.hide();
            return data;
        }).then((data) => {
            sec2.prepend(buildTemplate1(data));
            return data;
        }).then((data) => {
            form2.append(buildTemplate2(data));
        });
    });

    form2.submit((e) => {
        e.preventDefault();
        let slotSelected = $("input[name = candidate]:checked").val();
        fetch(`/${input.val()}/${slotSelected}`, {
            method : "put",
            headers : {
                "Content-Type" : "application/json; charset = utf-8"
            }
        }).then((doc) => {
            sec2.hide();
            window.alert("Successfully Voted!");
            input.val('');
            sec1.show();
        });
    });
});