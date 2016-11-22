var hasClass, addClass, removeClass, toggleClass, radioClass;

hasClass = (el_node, check_class_name) => {
  let reg = new RegExp(`(^|\\s+)${check_class_name}($|\\s+)`);
  let current_class = el_node.getAttribute('class');
  return reg.test(current_class);
};

addClass = (el_node, add_class_name) => {
  if ( !hasClass(el_node, add_class_name) ) {
    let current_class = el_node.getAttribute('class');
    el_node.setAttribute('class', `${current_class} ${add_class_name}`);
  }
};

removeClass = (el_node, remove_class_name) => {
  if ( !remove_class_name ) { el_node.setAttribute('class', ''); }
  if ( hasClass(el_node, remove_class_name) ) {
    var reg = new RegExp(`(^|\\s+)${remove_class_name}($|\\s+)`);
    var changed_class = el_node.getAttribute('class').replace(reg, '');
    el_node.setAttribute('class', changed_class);
  }
};

toggleClass = (el_node, toggle_class_name) => {
  hasClass(el_node, toggle_class_name) ?
    removeClass(el_node, toggle_class_name) :
    addClass(el_node, toggle_class_name);
};