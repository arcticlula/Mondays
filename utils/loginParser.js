export default function (rawObject = {}) {
  const { isNewUser, profile } = rawObject.additionalUserInfo
  return { isNewUser, profile }
}
