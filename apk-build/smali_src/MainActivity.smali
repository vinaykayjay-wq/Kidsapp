.class public Lcom/kidquest/app/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"

.method public constructor <init>()V
    .registers 1
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V
    return-void
.end method

.method protected onCreate(Landroid/os/Bundle;)V
    .registers 5
    .param p1, "savedInstanceState"

    # Call super
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    # setContentView(R.layout.activity_main)  [0x7f020000]
    const v0, 0x7f020000
    invoke-virtual {p0, v0}, Landroid/app/Activity;->setContentView(I)V

    # WebView webView = (WebView) findViewById(R.id.webview)  [0x7f040000]
    const v1, 0x7f040000
    invoke-virtual {p0, v1}, Landroid/app/Activity;->findViewById(I)Landroid/view/View;
    move-result-object v1
    check-cast v1, Landroid/webkit/WebView;

    # webView.getSettings().setJavaScriptEnabled(true)
    invoke-virtual {v1}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v2
    const/4 v3, 0x1
    invoke-virtual {v2, v3}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V

    # webView.getSettings().setDomStorageEnabled(true)
    invoke-virtual {v1}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v2
    invoke-virtual {v2, v3}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V

    # webView.getSettings().setAllowFileAccess(true)
    invoke-virtual {v1}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v2
    invoke-virtual {v2, v3}, Landroid/webkit/WebSettings;->setAllowFileAccess(Z)V

    # webView.getSettings().setAllowFileAccessFromFileURLs(true)
    invoke-virtual {v1}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v2
    invoke-virtual {v2, v3}, Landroid/webkit/WebSettings;->setAllowFileAccessFromFileURLs(Z)V

    # webView.getSettings().setAllowUniversalAccessFromFileURLs(true)
    invoke-virtual {v1}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v2
    invoke-virtual {v2, v3}, Landroid/webkit/WebSettings;->setAllowUniversalAccessFromFileURLs(Z)V

    # webView.loadUrl("file:///android_asset/public/index.html")
    const-string v2, "file:///android_asset/public/index.html"
    invoke-virtual {v1, v2}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V

    return-void
.end method

.method public onBackPressed()V
    .registers 3

    # Find webview [0x7f040000]
    const v1, 0x7f040000
    invoke-virtual {p0, v1}, Landroid/app/Activity;->findViewById(I)Landroid/view/View;
    move-result-object v1
    check-cast v1, Landroid/webkit/WebView;

    # if (webView.canGoBack()) webView.goBack() else super.onBackPressed()
    invoke-virtual {v1}, Landroid/webkit/WebView;->canGoBack()Z
    move-result v2
    if-eqz v2, :no_back

    invoke-virtual {v1}, Landroid/webkit/WebView;->goBack()V
    return-void

    :no_back
    invoke-super {p0}, Landroid/app/Activity;->onBackPressed()V
    return-void
.end method
