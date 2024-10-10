import { dedent } from "ts-dedent";
export const kotlin = dedent`
data class Post(val id: Int, val title: String, val content: String, val type: PostType)

enum class PostType {
    TEXT,
    IMAGE,
    VIDEO
}

fun processPost(post: Post) {
    when (post.type) {
        PostType.TEXT -> {
            println("Processing text post: \${post.title}")
            // Text post processing logic goes here
        }
        PostType.IMAGE -> {
            println("Processing image post: \${post.title}")
            // Image post processing logic goes here
        }
        PostType.VIDEO -> {
            println("Processing video post: \${post.title}")
            // Video post processing logic goes here
        }
    }
}
`;
