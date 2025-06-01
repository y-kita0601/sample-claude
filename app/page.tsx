export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <h1 className="logo">TechCorp</h1>
          </div>
          <div className="nav-menu">
            <a href="#home" className="nav-link">ホーム</a>
            <a href="#services" className="nav-link">サービス</a>
            <a href="#about" className="nav-link">会社概要</a>
            <a href="#contact" className="nav-link">お問い合わせ</a>
          </div>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                革新的なITソリューションで<br />
                <span className="text-accent">未来を創造</span>
              </h1>
              <p className="hero-description">
                TechCorpは最先端の技術とイノベーションで、企業のデジタル変革を支援し、
                持続可能な成長と競争力の向上を実現します。
              </p>
              <div className="hero-buttons">
                <a href="#services" className="btn btn-primary">サービス一覧</a>
                <a href="#contact" className="btn btn-secondary">お問い合わせ</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services">
          <div className="container">
            <h2 className="section-title">私たちのサービス</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">💻</div>
                <h3>システム開発</h3>
                <p>お客様のニーズに合わせたカスタムシステムの設計・開発を行います。最新技術を活用し、効率的で拡張性の高いシステムを提供します。</p>
              </div>
              <div className="service-card">
                <div className="service-icon">☁️</div>
                <h3>クラウドサービス</h3>
                <p>AWS、Azure、GCPなどの主要クラウドプラットフォームを活用したインフラ構築から運用まで、トータルサポートいたします。</p>
              </div>
              <div className="service-card">
                <div className="service-icon">📱</div>
                <h3>モバイルアプリ開発</h3>
                <p>iOS・Android対応のネイティブアプリケーションから、React NativeやFlutterを使用したクロスプラットフォーム開発まで対応。</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🤖</div>
                <h3>AI・機械学習</h3>
                <p>人工知能と機械学習技術を活用した自動化ソリューションで、業務効率の向上と新しい価値創造を支援します。</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🔒</div>
                <h3>セキュリティ</h3>
                <p>サイバーセキュリティ対策からデータ保護まで、企業の重要な情報資産を守るための包括的なセキュリティソリューション。</p>
              </div>
              <div className="service-card">
                <div className="service-icon">📊</div>
                <h3>データ分析</h3>
                <p>ビッグデータの収集・分析から可視化まで、データドリブンな意思決定を支援するビジネスインテリジェンスソリューション。</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">会社概要</h2>
            <div className="about-content">
              <div className="about-text">
                <h3>私たちのミッション</h3>
                <p>
                  TechCorpは、革新的なテクノロジーを通じて社会の課題を解決し、
                  より良い未来を創造することを使命としています。
                  お客様との長期的なパートナーシップを大切にし、
                  共に成長していくことを目指しています。
                </p>
                
                <h3>私たちの強み</h3>
                <ul className="strength-list">
                  <li>10年以上の豊富な開発経験</li>
                  <li>最新技術への継続的な投資と研究</li>
                  <li>多様な業界での実績とノウハウ</li>
                  <li>アジャイル開発による迅速な対応</li>
                  <li>24/7サポート体制</li>
                </ul>
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">プロジェクト完了</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">満足したクライアント</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">年の経験</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">サポート体制</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">お問い合わせ</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>お気軽にご相談ください</h3>
                <p>プロジェクトのご相談やお見積りなど、お気軽にお問い合わせください。経験豊富なエンジニアがお客様のニーズに最適なソリューションをご提案いたします。</p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <strong>📧 Email:</strong>
                    <span>contact@techcorp.jp</span>
                  </div>
                  <div className="contact-item">
                    <strong>📞 Tel:</strong>
                    <span>03-1234-5678</span>
                  </div>
                  <div className="contact-item">
                    <strong>📍 Address:</strong>
                    <span>東京都渋谷区渋谷1-1-1 TechCorpビル 10F</span>
                  </div>
                  <div className="contact-item">
                    <strong>🕐 営業時間:</strong>
                    <span>平日 9:00-18:00</span>
                  </div>
                </div>
              </div>
              
              <div className="contact-form">
                <h3>お問い合わせフォーム</h3>
                <form className="form">
                  <div className="form-group">
                    <label htmlFor="name">お名前 *</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">メールアドレス *</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">会社名</label>
                    <input type="text" id="company" name="company" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">お問い合わせ内容 *</label>
                    <textarea id="message" name="message" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">送信する</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>TechCorp</h3>
              <p>革新的なITソリューションで未来を創造</p>
            </div>
            <div className="footer-section">
              <h4>サービス</h4>
              <ul>
                <li><a href="#services">システム開発</a></li>
                <li><a href="#services">クラウドサービス</a></li>
                <li><a href="#services">モバイルアプリ開発</a></li>
                <li><a href="#services">AI・機械学習</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>会社情報</h4>
              <ul>
                <li><a href="#about">会社概要</a></li>
                <li><a href="#contact">お問い合わせ</a></li>
                <li><a href="#">プライバシーポリシー</a></li>
                <li><a href="#">利用規約</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>フォローする</h4>
              <div className="social-links">
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="GitHub">🐱</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TechCorp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}