# Netlify yayını ve .com alan adı

## Mevcut siteyi güncelleme

Bu sürüm mevcut `thetruth2003/alperen-portfolyo-site` reposu içindir. Yeni bir hosting hesabı gerekmez.

1. Değişiklik dalını önizleyin; mevcut Netlify projesinde Deploy Previews açıksa pull request için önizleme oluşturulur.
2. Yayına alınacak değişiklikleri Netlify'nın izlediği production dalına birleştirin (normalde `main`).
3. `netlify.toml` ayarları: build komutu `npm run build`, yayın klasörü `dist`, Node.js 22.
4. Deploy başarılı olduktan sonra ana sayfayı, proje detayını, mobil menüyü ve iletişim bölümünü kontrol edin.

Manuel yayın gerekiyorsa `npm run build` ile oluşan **dist klasörünün içeriği** yüklenir. Kaynak klasörünü yüklemeyin.

## İletişim formu

Form Netlify Forms için hazırdır; hesabın ayarı bu repodan doğrulanamaz.

1. Netlify projesinde **Forms → Enable form detection** açın.
2. Siteyi yeniden deploy edin; `portfolio-contact` adlı formun listelendiğini doğrulayın.
3. Bildirim almak istediğiniz adresi form bildirim ayarlarında seçin.
4. Kendi bilginizle bir test gönderimi yapın ve hem panelde hem bildirim kanalında alındığını doğrulayın.

Form boş alan, e-posta biçimi ve minimum mesaj uzunluğu kontrolü içerir. Honeypot alanı vardır. Gönderim hatasında doğrudan e-posta bağlantısı kullanılabilir. Yerel önizleme mesaj göndermez. Gerçek gönderim test edilmeden teslimatın çalıştığı varsayılmamalıdır.

Resmî kaynak: https://docs.netlify.com/manage/forms/setup/

## .com kullanmak

Henüz alan adı satın alınmadı. Alan adı kaydı ayrıca yapılır; Netlify barındırmasını değiştirmek gerekmez. Alan adının müsaitliği, ilk yıl bedeli ve yıllık yenileme ücreti satın almadan önce kayıt sağlayıcısında kontrol edilmelidir. `alperenbaltaci.com` yalnızca isim önerisidir; müsaitliği doğrulanmış değildir.

1. Seçtiğiniz `.com` alan adını satın alın.
2. Netlify projesinde **Domain management → Add a domain → Add a domain you already own** yolundan ekleyin.
3. Netlify DNS kullanacaksanız Netlify'nın verdiği ad sunucularını alan adı sağlayıcısına girin. Harici DNS kullanacaksanız **Pending DNS verification** ekranındaki alan adınıza özel kayıtları uygulayın.
4. Kök alan adı ve `www` sürümünden hangisini ana adres yapacağınızı seçin; diğerinin yönlendirmesini doğrulayın.
5. **Domain management → HTTPS** altında sertifikanın hazır olduğunu doğrulayın.
6. Netlify ortam değişkenlerine `SITE_URL=https://secilenalanadi.com` ekleyip yeniden deploy edin. Sitemap ve sosyal paylaşım adresleri böyle güncellenir.

Alan adı almak, otomatik olarak `merhaba@alanadi.com` gibi bir posta kutusu sağlamaz; özel e-posta istenirse ayrı yapılandırılır.

Resmî kaynaklar:
- https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/
- https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/

Bu çalışma kapsamında alan adı satın alınmadı, DNS kaydı veya Netlify hesap ayarı değiştirilmedi.
