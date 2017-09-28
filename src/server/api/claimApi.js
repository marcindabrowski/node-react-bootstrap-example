const urls = require('./restApiUrls');

const url = '/api/claim';

function getRegisteredClaims(req) {
  return req.app.get('registeredClaims');
}

function findClaim(req, res, bodyCallback) {
  const claim = getRegisteredClaims(req).findOne({ id: Number(req.params.id) });
  if (claim) {
    bodyCallback(claim);
  } else {
    res.status(404).end();
  }
}

const createClaim = (req, res) => {
  const registeredClaims = getRegisteredClaims(req);
  const id = getRegisteredClaims(req).chain().count() + 1;
  const claim = req.body;
  claim.id = id;
  claim.status = 'New';

  registeredClaims.insert(claim);
  res
    .status(201)
    .location(`${url}/${id}`)
    .end();
};

const getAllClaims = (req, res) => {
  res.status(200).send(JSON.stringify(getRegisteredClaims(req).chain().data()));
};

const getClaim = (req, res) => {
  findClaim(req, res, (claim) => {
    res.status(200).send(JSON.stringify(claim));
  });
};

const updateClaimStatus = (req, res) => {
  findClaim(req, res, (claim) => {
    const claimToChange = claim;
    if (claimToChange.status !== 'New') {
      res.status(403).send(`Changing claim with status ${claimToChange.status} is forbidden.`);
    } else {
      claimToChange.status = req.body.status;
      getRegisteredClaims(req).update(claimToChange);
      res.status(200).end();
    }
  });
};

const routes = (router, isAuthenticatedMiddleware) => {
  router.post(urls.createUrl(), createClaim);
  router.get(urls.readUrl(), isAuthenticatedMiddleware, getAllClaims);
  router.get(urls.readByIdUrl(), isAuthenticatedMiddleware, getClaim);
  router.patch(urls.updateUrl(), isAuthenticatedMiddleware, updateClaimStatus);

  return router;
};

module.exports = {
  url,
  routes,
};
