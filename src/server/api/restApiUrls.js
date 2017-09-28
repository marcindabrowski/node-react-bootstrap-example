
const createUrl = () => '/';

const readUrl = () => '/';

const readByIdUrl = () => '/:id';

const updateUrl = (id) => {
  if (id) {
    return `/${id}`;
  }
  return '/:id';
};

module.exports = {
  createUrl,
  readUrl,
  readByIdUrl,
  updateUrl,
};
