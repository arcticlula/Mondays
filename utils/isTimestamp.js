export default (o) => {
    return o && o.constructor.name === 'Timestamp';
}