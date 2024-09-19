import pluginContentBlog from '@docusaurus/plugin-content-blog';

async function blogPluginEnhanced(context, options) {
  // console.log(pluginContentBlog)
  return pluginContentBlog(context, options)
  // const blogPluginInstance = await pluginContentBlog(context, options);
  return pluginContentBlog(context, options).then(blogPluginInstance => {
    console.log(blogPluginInstance)
    return {
      ...blogPluginInstance,
      async contentLoaded({content, allContent, actions}) {
        // Create default plugin pages
        await blogPluginInstance.contentLoaded({content, allContent, actions});

        // Create your additional pages
        const {blogPosts, blogTags} = content;
        const {setGlobalData} = actions;

        setGlobalData({
          posts: blogPosts.slice(0, 10), // Only store 10 posts
          postNum: blogPosts.length, tagNum: Object.keys(blogTags).length,
        });
      },
    };

  }).catch(err => {
    console.log(err)
  })
}

// export default blogPluginEnhanced
export default Object.assign({}, pluginContentBlog, {default: blogPluginEnhanced});
