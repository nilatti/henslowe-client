import API from "./api.js";

async function createItem(item, itemType) {
  return API.post(`${itemType}s`, {
    [itemType]: item,
  });
}

async function createItemWithParent(parentType, parentId, itemType, item) {
  return API.post(`${parentType}s/${parentId}/${itemType}s`, item);
}

async function deleteItem(itemId, itemType) {
  return API.delete(`${itemType}s/${itemId}`);
}

async function getItem(itemId, itemType) {
  return API.request(`${itemType}s/${itemId}`);
}

async function getItems(itemType) {
  return API.request(`${itemType}s`);
}

async function getItemsWithParent(parentType, parentId, itemType) {
  return API.request(`${parentType}s/${parentId}/${itemType}s`);
}

async function updateServerItem(item, itemType) {
  let data = { ...item };
  delete data.id;
  return API.put(`${itemType}s/${item.id}`, { [itemType]: data });
}

export {
  createItem,
  createItemWithParent,
  deleteItem,
  getItem,
  getItems,
  getItemsWithParent,
  updateServerItem,
};
