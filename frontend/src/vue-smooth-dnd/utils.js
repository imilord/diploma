const isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

export function getTagProps (ctx, tagClasses) {
  const tag = ctx.$props.tag;
  if (tag) {
    if (typeof tag === 'string') {
      const result = { value: tag };
      if (tagClasses) {
        result.props = { class: tagClasses };
      }
      return result;
    } else if (typeof tag === 'object') {
      const result = { value: tag.value || 'div', props: tag.props || {} };

      if (tagClasses) {
        if (result.props.class) {
          if (isArray(result.props.class)) {
            result.props.class.push(tagClasses);
          } else {
            result.props.class = [tagClasses, result.props.class];
          }
        } else {
          result.props.class = tagClasses;
        }
      }

      return result;
    }
  }
  return { value: 'div' };
}

export function validateTagProp (tag) {
  if (tag) {
    if (typeof tag === 'string') return true;
    if (typeof tag === 'object') {
      if (
        typeof tag.value === 'string' ||
        typeof tag.value === 'function' ||
        typeof tag.value === 'object'
      ) {
        return true;
      }
    }
    return false;
  }
  return true;
}

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}
