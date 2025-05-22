// 메소드 확인 + badrequest 관리 함수
function checkRequest(req, res, option = {}) {
  const { allowedMethods, requireAuth = false, requireBody = false } = option;

  if (!allowedMethods || !Array.isArray(allowedMethods)) {
    console.error("api에 전달된 method가 공란입니다.");
    res.status(500).end();
    return false;
  }

  if (!allowedMethods.includes(req.method)) {
    res.status(405).end();
    return false;
  }

  if (requireAuth) {
    const userId = req.cookies.userId;
    if (!userId) {
      res.status(401).end();
      return false;
    }
    req.userId = userId;
  }

  if (requireBody && (!req.body || Object.keys(req.body).length == 0)) {
    res.status(400).end();
    return false;
  }

  return true;
}

function getUserIdFromCookie(req) {
  return req.cookies.userId || null;
}
