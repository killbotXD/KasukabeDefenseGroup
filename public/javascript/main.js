$(document).ready(() => {
    const form = $("#form");
    const display = $("#display");
    const input = $("#input");

    const buildTemplate = (doc) => {
        return `<input type = "radio">${doc._candidates[0].__name}`;
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
            display.append(buildTemplate(data));
        }).then(() => {
            form.hide();
        });
    });
});