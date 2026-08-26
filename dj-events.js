/*
 * DJイベントの単一原本。
 * 同じ日付とイベント名の項目を追加した場合は、先に定義された既存項目を保持して警告します。
 */
(() => {
  const source = [
    {
      date: '2026.10.03',
      title: 'ミミミュ♪ MEET MEAL MUSIC',
      image: 'images/dj-history/2026-10-03-mimimyu-meet-meal-music.jpg',
      links: [{ url: 'https://x.com/meetmealmusic', label: 'X' }],
      detail: '2026.10.03 (Sat) 13:30〜18:30（予定）　@ 大阪 タグボート大正　入場無料（要飲食代）',
      thumbnailAction: 'disabled',
    },
    {
      date: '2026.08.30',
      title: 'BSJ -BiShoJo愛好会- 5th',
      image: 'images/event2.jpg',
      links: [{ url: 'https://twipla.jp/events/691547', label: 'イベントページ' }],
      detail: '2026.08.30 (Sun) 13:00〜　@ 日本橋Bar Guild',
      thumbnailAction: 'disabled',
    },
    {
      date: '2026.08.09',
      title: 'ほろくら',
      image: 'images/event1.jpg',
      links: [{ url: 'https://twipla.jp/events/730679/', label: 'イベントページ' }],
      detail: '2026.08.09 (Sun) 13:00〜　@ 日本橋Bar Guild',
      setlistImage: 'images/horokura-dj-setlist.png',
      thumbnailAction: 'setlist',
    },
    { date: '2026.04.12', title: 'ほろくら', image: 'images/dj-history/2026-04-12-holokura.jpg', links: [{ url: 'https://twipla.jp/events/720839', label: 'イベントページ' }] },
    {
      date: '2026.04.04',
      title: 'ミミミュ♪ ～MEET MEAL MUSIC～',
      image: 'images/event3.jpg',
      links: [{ url: 'https://x.com/meetmealmusic', label: 'X' }],
      detail: '2026.04.04 (Sat) 12:30〜　@ タグボート大正',
      thumbnailAction: 'disabled',
    },
    { date: '2026.01.10', title: 'ほろくら', image: 'images/dj-history/2026-01-10-holokura.jpg', links: [{ url: 'https://twipla.jp/events/707267', label: 'イベントページ' }] },
    { date: '2025.10.18', title: 'ミミミュ♪ act.12', image: 'images/dj-history/2025-10-18-mimimyu-act-12.jpeg', links: [{ url: 'https://x.com/meetmealmusic', label: 'X' }] },
    { date: '2025.09.07', title: 'アニクラっぽいことVol.17', image: 'images/dj-history/2025-09-07-anikura-ppoi-koto-vol-17.png', links: [{ url: 'https://twvt.me/animo_17', label: 'イベントページ' }] },
    { date: '2025.08.24', title: '8/24 関西VCP -関西Vtuber Club Party-', image: 'images/dj-history/2025-08-24-kansai-vcp.png', links: [{ url: 'https://twipla.jp/events/688869', label: 'イベントページ' }] },
    { date: '2025.07.29', title: '俺達、いつだってサウナに行ったら伝えるんだけど -たりない夜のととのい方-', image: 'images/dj-history/2025-07-29-ore-tachi-sauna.jpg', links: [] },
    { date: '2025.06.28', title: '【2025/06/28(土)13時@なんばMILULARI Legacy】第十七回 世代対決系アニクラ「0010(#ゼロテン)」【参加表明で500円OFF!!!】', image: 'images/dj-history/2025-06-28-0010-zeroten-vol-17.jpg', links: [{ url: 'https://twipla.jp/events/681808', label: 'イベントページ' }] },
    { date: '2025.06.01', title: 'アニクラっぽいことVol.16', image: 'images/dj-history/2025-06-01-anikura-ppoi-koto-vol-16.jpg', links: [{ url: 'https://twvt.me/anipoi16_2025', label: 'イベントページ' }] },
    { date: '2025.05.30', title: '5/30(金) みんなで飯を食おう5月は春に食べたい野菜フェア！！/みんめしF/豚肉と厚揚げの甘辛卵炒めの日', image: 'images/dj-history/2025-05-30-minmeshi-f.jpg', links: [{ url: 'https://twipla.jp/events/646177', label: 'イベントページ' }] },
    { date: '2025.05.24', title: 'ミミミュ♪ act.11', image: 'images/dj-history/2025-05-24-mimimyu-act-11.jpeg', links: [{ url: 'https://x.com/meetmealmusic', label: 'X' }] },
    { date: '2025.04.26', title: 'ほろくら', image: 'images/dj-history/2025-04-26-holokura.jpg', links: [{ url: 'https://twipla.jp/events/669310', label: 'イベントページ' }] },
    { date: '2025.04.06', title: 'アニクラっぽいこと Vol.15', image: 'images/dj-history/2025-04-06-anikura-ppoi-koto-vol-15.jpg', links: [{ url: 'https://twvt.me/anipoi15_2025', label: 'イベントページ' }] },
    { date: '2025.02.22', title: 'ミミミュ♪ act.10', image: 'images/dj-history/2025-02-22-mimimyu-act-10.jpeg', links: [{ url: 'https://x.com/meetmealmusic', label: 'X' }] },
    { date: '2025.02.01', title: 'AxE_Reboot 01', image: 'images/dj-history/2025-02-01-axe-reboot-01.jpg', links: [{ url: 'https://twvt.me/AxE_reboot01', label: 'イベントページ' }] },
    { date: '2024.06.30', title: 'アニクラっぽいこと Vol.13', image: 'images/dj-history/2024-06-30-anikura-ppoi-koto-vol-13.png', links: [{ url: 'https://twipla.jp/events/618640', label: 'イベントページ' }] },
    { date: '2024.06.22', title: 'キャラクター狂騒曲 Vol.1', image: 'images/dj-history/2024-06-22-character-kyosokyoku-vol-1.jpg', links: [{ url: 'https://twipla.jp/events/613994', label: 'イベントページ' }] },
    { date: '2024.06.15', title: '電脳恋慕.EX', image: 'images/dj-history/2024-06-15-denno-renbo-ex.jpg', links: [{ url: 'https://twipla.jp/events/607660', label: 'イベントページ' }] },
    { date: '2024.06.14', title: '金曜のボイラールーム Ver.A', image: 'images/dj-history/2024-06-14-kinyobi-boiler-room-ver-a.jpg', links: [] },
    { date: '2024.05.04', title: 'ミミミュ♪ act.7', image: 'images/dj-history/2024-05-04-mimimyu-act-7.jpg', links: [] },
    { date: '2024.04.13', title: 'Vtuber酒場', image: 'images/dj-history/2024-04-13-vtuber-sakaba.jpg', links: [{ url: 'https://x.com/hashtag/Vtuber%E9%85%92%E5%A0%B4?src=hashtag_click&f=live', label: 'イベントページ' }] },
    { date: '2024.03.22', title: 'みんめしF', image: 'images/dj-history/2024-03-22-minmeshi-f.jpg', links: [{ url: 'https://twipla.jp/events/601890', label: 'イベントページ' }] },
    { date: '2024.02.18', title: 'アニクラっぽいこと Vol.12', image: 'images/dj-history/2024-02-18-anikura-ppoi-koto-vol-12.png', links: [{ url: 'https://twipla.jp/events/595813', label: 'イベントページ' }] },
    { date: '2023.12.17', title: 'アニクラっぽいこと Vol.11', image: 'images/dj-history/2023-12-17-anikura-ppoi-koto-vol-11.png', links: [{ url: 'https://twipla.jp/events/590767', label: 'イベントページ' }] },
    { date: '2023.11.11', title: 'ミミミュ♪ act.4', image: 'images/dj-history/2023-11-11-mimimyu-act-4.jpg', links: [{ url: 'https://twipla.jp/events/590767', label: 'イベントページ' }] },
    { date: '2023.10.09', title: 'ならヲタソンらんど4周年祭', image: 'images/dj-history/2023-10-09-nara-otason-4th.jpg', links: [{ url: 'https://twipla.jp/events/572823', label: 'イベントページ' }] },
    { date: '2023.09.26', title: '768Fest Vol.88', image: 'images/dj-history/2023-09-26-768fest-vol-88.jpg', links: [{ url: 'https://twipla.jp/events/579809', label: 'イベントページ' }] },
    { date: '2023.09.22', title: 'みんめしF', image: 'images/dj-history/2023-09-22-minmeshi-f.jpg', links: [{ url: 'https://twipla.jp/events/576820', label: 'イベントページ' }] },
    { date: '2023.09.03', title: 'APOP酒場', image: 'images/dj-history/2023-09-03-apop-sakaba.jpg', links: [{ url: 'https://x.com/Freja38795672', label: 'イベントページ' }] },
    { date: '2023.08.20', title: 'アニ集７', image: 'images/dj-history/2023-08-20-anishu-7.jpg', links: [{ url: 'https://twipla.jp/events/566503', label: 'イベントページ' }] },
    { date: '2023.07.16', title: 'オーサカシンセカイワンダー ランク2', image: 'images/dj-history/2023-07-16-osaka-shinsekai-wonder-rank-2.jpg', links: [{ url: 'https://twipla.jp/events/565903', label: 'イベントページ' }] },
    { date: '2023.03.03', title: 'みんめしF', image: 'images/dj-history/2023-03-03-minmeshi-f.jpg', links: [{ url: 'https://twipla.jp/events/543726', label: 'イベントページ' }] },
    { date: '2023.01.13', title: 'みんめしF', image: 'images/dj-history/2023-01-13-minmeshi-f.jpg', links: [{ url: 'https://twipla.jp/events/542435', label: 'イベントページ' }] },
    { date: '2022.12.29', title: 'アニクラっぽいこと Vol.10', image: 'images/dj-history/2022-12-29-anikura-ppoi-koto-vol-10.jpg', links: [{ url: 'https://twipla.jp/events/538822', label: 'イベントページ' }] },
    { date: '2022.11.13', title: 'エンジョイ♪オフタイム Vol.4', image: 'images/dj-history/2022-11-13-enjoy-offtime-vol-4.png', links: [{ url: 'https://twipla.jp/events/531495', label: 'イベントページ' }] },
    { date: '2022.10.22', title: 'あに部!!!!!! -animative- 第54話', image: 'images/dj-history/2022-10-22-anibu-animative-54.jpg', links: [{ url: 'https://twipla.jp/events/531772', label: 'イベントページ' }] },
    { date: '2022.10.09', title: 'ならヲタソンらんど 3周年祭', image: 'images/dj-history/2022-10-09-nara-otason-3rd.jpg', links: [{ url: 'https://twipla.jp/events/524268', label: 'イベントページ' }] },
    { date: '2022.09.24', title: '集まれERGの森', image: 'images/dj-history/2022-09-24-erg-no-mori.jpg', links: [{ url: 'https://twipla.jp/events/521668', label: 'イベントページ' }] },
    { date: '2022.07.24', title: 'ならヲタソンらんど', image: 'images/dj-history/2022-07-24-nara-otason.jpg', links: [{ url: 'https://twipla.jp/events/514542', label: 'イベントページ' }] },
    { date: '2022.04.16', title: '宵のBEAT 2 V', image: 'images/dj-history/2022-04-16-yoi-no-beat-2-v.jpg', links: [{ url: 'https://twipla.jp/events/508113', label: 'イベントページ' }] },
    { date: '2021.12.29', title: 'アニクラっぽいこと Vol.09', image: 'images/dj-history/2021-12-29-anikura-ppoi-koto-vol-09.gif', links: [{ url: 'https://twipla.jp/events/499870', label: 'イベントページ' }] },
    { date: '2021.10.03', title: 'ならヲタソンらんど', image: 'images/dj-history/2021-10-03-nara-otason.jpg', links: [{ url: 'https://twipla.jp/events/531495', label: 'イベントページ' }] },
  ];

  const keys = new Set();
  const events = source.filter((event) => {
    const key = `${event.date}\u0000${event.title}`;
    if (keys.has(key)) {
      console.warn(`[DJ_EVENTS] 重複を検出したため既存データを保持しました: ${event.date} ${event.title}`);
      return false;
    }
    keys.add(key);
    return true;
  }).map((event) => Object.freeze({ ...event, links: Object.freeze([...event.links]) }));

  window.DJ_EVENTS = Object.freeze(events);
})();
