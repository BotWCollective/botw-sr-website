
import { visit } from 'unist-util-visit'

export default (options: any) => {
  if (!options || !options.video) {
    //throw Error('Required video option is missing in remark-video configuration')
  }

  const isVideo = (node: any) => {
    if (node) {
      if (node.tagName == 'youtube') {
        return true
      }
    }
    return false;
  }

  const timestamp_to_seconds = (timestamp: string) => {
    let time = null;
    const re = /^\s*((\d+h)?(\d+m)?(\d+s)?|(\d+))\s*$/g;
    const groups = [...timestamp.matchAll(re)];
    if (groups.length > 0) {
      let secs = 0;
      const m = groups[0];
      console.log(m);
      if (m[5]) { // only a number
        secs = parseInt(m[5]);
      } else {
        if (m[2]) { // hours
          secs += parseInt(m[2].replace(/[hH]/, '')) * 60 * 60;
        }
        if (m[3]) { // minutes
          secs += parseInt(m[3].replace(/[mM]/, '')) * 60;
        }
        if (m[4]) { // seconds
          secs += parseInt(m[4].replace(/[sS]/, ''));
        }
      }
      time = secs.toString();
    }
    return time;
  }
  const visitor = (node: any, index: number, parent: any) => {
    if (isVideo(node)) {
      console.log('VIDEO');
      let youtube_allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      /*
        <iframe width="560" height="315"
        src="https://www.youtube.com/embed/tXyPTq5O39o?start=123"
        title="YouTube video player"
        frameborder="0"
        allow=" allowfullscreen></iframe>
        <clip youtube_id="tXyPTq5O39o" t="123"/>
   
      */


      const id = node.properties.id || "";
      let time = "";
      if (node.properties.t) {
        let t = timestamp_to_seconds(node.properties.t);
        if (t) {
          time = `?start=${t}`;
        }
      }
      node.tagName = 'iframe';
      node.properties.src = `https://www.youtube.com/embed/${id}${time}`;
      node.properties.width = '560';
      node.properties.height = '315';
      node.properties.title = 'Youtube video player';
      node.properties.frameborder = "0";
      node.properties.allow = youtube_allow;
      node.properties.allowfullscreen = true;
    }
  }

  const transform = (tree: any) => {
    //console.log('TRANSFORM', tree);
    visit(tree, 'element', visitor)
  }

  return transform
}
