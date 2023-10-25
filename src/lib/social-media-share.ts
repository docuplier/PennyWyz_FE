export class SocialMediaShare {
  getWindow = () => (typeof window !== "undefined" ? window : undefined);

  getPageUrl = (url: string) => {
    return this.getWindow() ? `https://pennywyz.com/${url}` : "";
  };

  openInWindow = (url: string) =>
    this.getWindow() && window.open(url, "_blank");

  twitter = ({ text, url }: { text: string; url: string }) => {
    const tweetText = encodeURIComponent(text);
    const tweetUrl = encodeURIComponent(url);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    this.openInWindow(twitterUrl);

    // this.getWindow() && window.open(twitterUrl, "_blank", 'width=550,height=420');
  };

  instagram = ({ image, caption }: { image: string; caption: string }) => {
    const instagramUrl = `instagram://library?AssetPath=${encodeURIComponent(
      image
    )}&InstagramCaption=${encodeURIComponent(caption)}`;

    // window.location.href = instagramUrl;
    this.openInWindow(instagramUrl);
  };

  facebook = ({ url }: { url: string }) => {
    const encodedText = encodeURIComponent(url);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedText}`;

    this.openInWindow(facebookShareUrl);
  };

  linkedIn = ({ url, text }: { url: string; text: string }) => {
    const encodedText = encodeURIComponent(text);
    const linkUrl = encodeURIComponent(url);

    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${linkUrl}`;
    this.openInWindow(linkedInShareUrl);
  };
}
