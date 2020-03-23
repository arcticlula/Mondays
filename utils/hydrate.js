import { get, set, fill } from 'lodash'

const getReference = async documentReference => {
    const res = await documentReference.get()
    const data = res.data()

    if (data && documentReference.id) {
        data.uid = documentReference.id
    }

    return data
}

export default async (document, paths = []) => Promise.all(
    paths.map(async path => {
        const documentField = get(document, path)
        if (documentField.constructor.name === 'Array') {
            for (let i = 0; i < documentField.length; i++) {
                const documentReference = documentField[i];
                if (!documentReference || !documentReference.path) {
                    return console.warn(
                        `Error hydrating documentReference for path "${path}": Not found or invalid reference`
                    )
                }
                const result = await getReference(documentReference)
                console.log(result)
                fill(documentField, result, i)
            }
        }
        else {
            const documentReference = documentField;
            if (!documentReference || !documentReference.path) {
                return console.warn(
                    `Error hydrating documentReference for path "${path}": Not found or invalid reference`
                )
            }

            const result = await getReference(documentReference)
            set(document, path, result)
        }
    })
)
