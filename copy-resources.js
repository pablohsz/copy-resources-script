const baseUrl = "https://msging.net/commands";

const baseRouterKey = "chave do roteador/chatbot base";
const targetRouterKey = "chave do roteador/chatbot alvo";
let params = {
    headers: {
        "Authorization": baseRouterKey,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "id": generateGuid(),
        "method": "get",
        "uri": "/resources"
    }),
    method: "POST"
}

fetch(baseUrl, params)
.then(response => response.json())
.then(data => {
    const resources = data.resource.items;
    resources.forEach(resource => {
        params = {
            headers: {
                "Authorization": baseRouterKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": generateGuid(),
                "method": "get",
                "uri": "/resources/" + resource 
            }),
            method: "POST"
        };
        fetch(baseUrl, params)
        .then(response => response.json())
        .then(data => {

            params = {
                headers: {
                    "Authorization": targetRouterKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": generateGuid(),
                    "method": "set",
                    "uri": "/resources/" + resource,
                    "resource": data.resource
                }),
                method: "POST"
            };
            fetch(baseUrl, params)
            .then(response => response.json())
            .then(data => {
                console.log(`recurso: ${resource}, status: ${data.status}`);
            })
            .catch(error => console.error("Erro:", error));
        })
        .catch(error => console.error("Erro:", error));
    });
})
.catch(error => console.error("Erro:", error));



function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}; 
