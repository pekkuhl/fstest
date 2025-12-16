import axios from "axios";
const baseUrl = "/api/persons"

const getAll = () => (
    axios.get(baseUrl)
    .then(res => (
        res.data
    ))
)

const create = (nameObject) => (
    axios.post(baseUrl, nameObject)
)

const change = (id, updated) => (
    axios.put(`${baseUrl}/${id}`, updated)
)

const remove = (i) => (
    axios.delete(baseUrl + "/" + String(i))
)


export default {
    getAll,
    create,
    change,
    remove
}