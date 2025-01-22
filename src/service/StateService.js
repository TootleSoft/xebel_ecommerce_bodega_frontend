export class StateService {
    getStates() {
        return fetch('/demo/data/state.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.data);
    }
}