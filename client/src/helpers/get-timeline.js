export default (root, inst) => {
  if (inst.timeline.duration > 1) {
    return inst.timeline
  }
  return root.timeline
}
