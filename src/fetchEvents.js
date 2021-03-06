export default function fetchEvents() {
  return fetch("https://www.react-europe.org/gql", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        events(slug: "reacteurope-2017") {
          schedule {
            title
            speakers {
              avatarUrl
            }
          }
        }
      }`
    })
  })
    .then(r => r.json())
    .then(j => j.data.events);
}
