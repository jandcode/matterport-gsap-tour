'use client';

import { useEffect, useRef, useState } from 'react';
import { TourStep } from '@/types/tour';

interface MatterportViewerProps {
    modelId: string;
    applicationKey: string;
    assetBase?: string;
    currentStep?: TourStep;
    onSdkReady?: (mpSdk: any) => void;
}

export default function MatterportViewer({
    modelId,
    applicationKey,
    assetBase = 'foo',
    currentStep,
    onSdkReady
}: MatterportViewerProps) {
    const viewerRef = useRef<any>(null);
    const mpSdkRef = useRef<any>(null);

    useEffect(() => {
        // Import the web component on the client side
        import('@matterport/webcomponent');

        const viewer = viewerRef.current;
        if (!viewer) return;

        const handlePlaying = (evt: any) => {
            const mpSdk = evt.detail.mpSdk;
            mpSdkRef.current = mpSdk;
            console.log('SDK Playing', mpSdk);

            // Sweep IDs from /Docs/sweeparray.txt
            const allSweeps = [
                "kqm98ufnhq0uskktfs7nuxdfd", "k4ry8qy9n9wtgwyg1p17n1nxd", "mxeftfr8sa56gd0dftsr3xrha",
                "fehhp1xfrkwda8uhfe49wmqad", "sd3twcbz06m20sui17q1he3cd", "ia25di7xasc6xwxc7u8xdbxad",
                "969cyme7iscg9ymp8907be4wb", "ub30mbtrxdb081pauikpzpr0d", "1my959ghwz2aha1wd3zaunzua",
                "3f9ksr7rbs87qpwgddtx9q4qb", "xmz47dqp9rkw67cxsk667hayc", "g6nz9hdef279t6zkw1maua9rc",
                "ufq4au16mpc5bfheet8te9m5d", "ydqp6maczimex7rp6gm46ew4d", "mntu26bfxk1mmy6ygrtsz79hb",
                "pc39qp5k4cbkf8ubmybmh7sud", "zmzzzi2us6fhqcpira1rdxpyb", "qwmuu79e389rywktfpmy8qunb",
                "6r5z9a20zqz4nf73m305kqgdb", "rdub7pqg27c7xg177sw0bshwd", "d1sk0nb4pyxqh5i77mnx99s5b",
                "0nae5nwpb00w8qg7kfng1c9ac", "fnn9b3rtnmgh4fuq5tzgnqh0a", "er5msgy99gqs9fzntafh6z50b",
                "ym20raxne0ygr2gieebi15wdd", "rp8m3i7dat2hp50f5nuuxgfua", "n71kcds6st91bt5nir40papub",
                "m0m1zta4tpesqr1br451id8ud", "zbt36k57bbrzu0914m21mwhyc", "sr6gs4m1sfxanepqdyggwc7eb",
                "s816ee9zu0pwcq3a6c7m7ztya", "8hubr49m7tntmikk2dfphsxpc", "k8fdysrubi8eyiquisug0br2d",
                "5fz589iexyfzcpccga5cr0rga", "iurrammyaagwqidiy5p4ga8sb", "d57b1awmez4uw6cbw5tq5n6hc",
                "yw9bc049tx4cif3tqthz1xuxd", "whq2cgwc7fstc4z6hh1tqcnrb", "i5c71011tn0hr46gknfd9emmd",
                "nqmw84qk1e6zrawn229sn3fka", "txigxrckhn6n1dkupxzg9dufc", "hf1q480uy41i6tfbtfpz8p3ic",
                "iwdr4xg24m4mufsw3b23gpp7d", "p7d3qr0wynz81hq70qb3hdhcb", "zrmh2bferyr9w7pmra0q4gbdd",
                "6yhkh35pnh0aragzuagh1gexd", "zp0wxxbguckd3ske0ksqbsfha", "5q2bsb7945z5niczgmcpiua1d",
                "0zaywrpdmpcigg98upmq565qa", "iye7wkpaiuzih9tm1w1qq6egd", "9yu425021b5byeerdxz73asac",
                "yxcbk5e87g0zkdm69xptiwpmc", "usnr8b9wnyphduek16rfckfhc", "rhp7y9r31kzic6srzxfgt5krd",
                "gf3nx8e316qzegf8a58qzk66a", "qdefdk9ay3m9s97y5f4z03n2b", "595chak73ukz2wnuk3qm00z4c",
                "qdrm819kh59hgf85fr5d2mipa", "0f2tbkufk0yknzks8btnmnxxa", "fs34hb1p3yceprg36d48x9s8a",
                "qmahf2nttce746qspda4nse5c", "68drn2iyci38d4c93gea7981d", "ty8yyw6w6dc8myq7cwbnsg34b",
                "85z4hgu394k720bty6gq5kgcc", "0s5iskz7nax3k3f6fapqcgu2c", "z7bcfadyt9h4ssfks5ctx7zud",
                "ua71zhtxu54y6fhz3n3bwtefb", "6rd7syi0znpwfm3depccc1a7c", "92q51u531i7pr23tm8ebf1f5b",
                "1kr5ueduas90sui1kru0cnpnd", "d2iqi1huu5imciwaad0xz1cqb", "2zduar26w2ihqte4w5cnzw0rd",
                "ekwn51e7q1uhrgtquxzcadudb", "q3fu0uukfhzsk6fpwe9brizzd", "5dwdsz501kmripcsazbknrr2a",
                "mq9a8dkpmpaqu3z9f4m7k5xgc", "ah4tfm31g8sftd47tt17qk74d", "u2xp1da2rwqrd4d3ewtq1s1rd",
                "wxa19ek2n9rwzedbbs1m1713a", "dtdr0wu9mcnhzbk0wm3b3nzxb", "6cy81ehatqauxm0gic7uezd7b",
                "m5t8q3yru5dmeswprubi7idda", "7yd2hz01scpq9f8c9yk21qtfd", "41dqwhxxxs87agzutm6ccq97b",
                "7a6ek0wuttg09fcdm3g4zhm6b", "aqg3cddiswbt7p7eati08z7yb", "sf3xz8pc9eccgmwrndt2qniqa",
                "d2auyg5ux75pwrcrft6zniubd", "2nbkwu9hnkyct7yg8iwzc81ec", "hhsdgsbycf2np28tz7cy1hw2b",
                "8exzaffrhrg0k09ndeh2eqr8c", "ztp1yfnqy22m71fzepade3f6b", "iemtads3nf8ucnsq7zsru8zca",
                "g996znzy89x8fw2p66cp3ifca", "8qdghzx6ayn70hytt9bwbxrzc", "6s6mf4874znnaui6c78sxei9d",
                "2z7y574nhxh41mbw0tzkp89hd", "9yp6w5uhg1agwif12e197bq7b", "tqmp1sd0wqe6eyeeq12n75fwb",
                "908stuhfssp7zaes54yfxdahc", "1qei6m55qz4ztws48b644qcua", "9ruhqyzwasfb3tp2y1pth1i3a",
                "hmqq8hcw1t77r1hrrckythf2d", "n2m7abspfugdf7s6cf1qthpgb", "eyt1bz3gk180r8i1mhk85i6da",
                "ybq9awhm7zzi8ckeibu6s8p3b", "x5zw7gqwrz54khzb1470w2b1d", "q7zg5s89h41f8r4z7b22mpb5c",
                "xati7itx8d9gh26sq4w3be60c", "hap935x8rxi9qi99h1k6ztn3b", "p9e9sa2bbnyfi1nicspa1sx0c",
                "p37rpita4dygm3ur8b8qfkwyc", "wyg7b1edekzgmuz438uq15fnc", "m6k8z8808ss1b54g0y38c8rfd",
                "dftz1ffm1xamewe7rfr6x649d", "fi9q17h1x8278dczpinztwu0c", "d117ch3zxknxydankn17bhrzc",
                "3kwn5zs5855asi5qacs1tf28b", "uz52d73mmqx2mtmcg1ri84bmd", "qf6b2g23gh1eesk7e1hhs3fia",
                "msc6u562r6e6kr3pkifyb9neb", "kykxpi1m5bg1gtgeezfmytzia", "qkdmih0xr7yqhf2u2177hyswc",
                "qq5qx2ig2birwmwc92g0f2z6a", "d9unytgwxzz35edxz6rzbwguc", "d2g67xm1m5mmigpyxib2myz6a",
                "ui57ttnuq0qrqd0rcim4ha9hd", "mpyt45rqrwsmywec2kbsyx4ba", "8ge3rxbwxfa8qcrwmzy2gdp4b",
                "gqi9dake4tnq1s5fs3qrrhueb", "r7asfc9gzrdin64d72uexuc5a", "h4yhcgzbdm140s6kar4sz1agd",
                "wqim3kr7ik09tkfbic94y09xb", "9efrnxcw3m6cppa3a9g427gqd", "ax7nc2ehssb1rmcwhg70n0zac",
                "h9ywmdcmamgqg9gqx9p16s3pb", "2h2ae9fwubesuymz2z79fd32c", "8y68w1mze86ynw49u4wshfxxd",
                "24831s1a3stbps8zw62td71rd", "9ftpaqfm722uyxkp1t7fw6bdb", "uhbta7hg5xsix07kbwub5uqaa",
                "w9dshmk9at9xkte204bdgacxd", "d29h8tuyy2xhdfr5tytbh6x7b", "us2c9tgwex57f2cua8f6dm6ia",
                "euze4qecx37kfu214qn2hhbbb", "npgsncrfzmbau7e717ue9m2rb", "esr46ur67914tacn5czsrtydd",
                "x7k36s2xs7qt8a40apf1yy95d", "81f3ksmtbf9ikiyqefms3gr9b", "9nwwuhtxepnc1xp0cxp1ityza",
                "2kh60ch30sfh06iw39zew2ard", "rmnz3072165fkygd9bgf9qgxd", "i48fuix53656cb9bscsg2uk1c",
                "sd8im7yx3cce2huszs4z27d4d", "9bbih575zkf4b11dkt7rfz7ma", "2wwwuasfi919969r17ptxaawc",
                "qmpc2tzukzd7euepdn9txze3d", "m7b18n4p2201duae064sch2ca", "xbhrrwhrdq00qbrzhsqkm1ubc",
                "pqhem8a4qz4p4bwn2x1dtzipd", "y409hme67yudpipntpwgnih2a", "9u8ty2pnkqgx29ymktbmdtncd",
                "9zigkiw0a041pi58uaqa1mrfc", "cp2nxw069xha7yzzxkris7src", "53abna0m8k2p1ubnb13btimtb",
                "3zu2p2z1gc8z95u5wz5t3zmtd", "29a415tx0pti8hkb6rkm1bd5a", "n41n4qmwqb8ki87nbmn2adqkd",
                "zx2z8bdzhmgu6nd8pm1zr5bud", "aci32tpi9u6p66mx6xwcam4ad", "e5u8c4duw9xzb2uefp2p06kbd",
                "npucd5qddbu9edatnkeb79nmd", "zya4musn6tu3xpg6bifs7q57d", "ps3izu4wtws89z8cb8pdkqafd",
                "qnizemg4badb0k5tn5ha47z8d", "h5mcbtgwr2cnxxc6re8endieb", "qtscctahb1e5a8s3kk7eq5mna",
                "hut7p1innbp6eye0yqnscq18d", "y024grab1k8p2ayfbdgszhc3d", "c0te8q3dgi9yt0s81uswawnia",
                "4ehqny65twh58gy0gqfxd5g1d", "4mstf62tmuqim1iw1dhzy384c", "f7fa42siq757qmfpmdnb4rfcc"
            ];

            // Disable all sweeps at the start
            mpSdk.Sweep.disable(...allSweeps)
                .then(() => console.log('All sweeps disabled successfully'))
                .catch((err: any) => console.error('Error disabling sweeps:', err));

            // Subscribe to sweep data as requested
            mpSdk.Sweep.data.subscribe({
                onAdded: function (index: any, item: any, collection: any) {
                    console.log('sweep added:', item.sid);
                },
                onCollectionUpdated: function (collection: any) {
                    console.log('ALL_SWEEPS_COLLECTION:', Object.keys(collection));
                    // Global variable for browser subagent to grab
                    (window as any).collectedSweeps = Object.keys(collection);
                }
            });

            if (onSdkReady) onSdkReady(mpSdk);
        };

        viewer.addEventListener('mpSdkPlaying', handlePlaying);

        return () => {
            viewer.removeEventListener('mpSdkPlaying', handlePlaying);
        };
    }, [onSdkReady]);

    // React to step changes
    useEffect(() => {
        const mpSdk = mpSdkRef.current;
        if (!mpSdk || !currentStep) return;

        const handleNavigation = async () => {
            console.log("Navigating to sweep:", currentStep.sweep);
            try {
                // Use INSTANT as requested to allow GSAP to handle the "feel"
                const rotation = { x: currentStep.rotation.x, y: currentStep.rotation.y };
                const transition = mpSdk.Sweep.Transition.INSTANT;

                await mpSdk.Sweep.moveTo(currentStep.sweep, {
                    rotation: rotation,
                    transition: transition,
                })
                    .then((sweepId: string) => {
                        console.log('Arrived instantly at sweep ' + sweepId);
                    })
                    .catch((error: any) => {
                        console.error('Error with moveTo command:', error);
                    });

            } catch (err) {
                console.error("Navigation error:", err);
            }
        };

        handleNavigation();
    }, [currentStep]);

    return (
        <div className="w-full h-full">
            <matterport-viewer
                ref={viewerRef}
                asset-base={assetBase}
                m={modelId}
                qs={1}
                dh={0}
                vr={0}
                title={0}
                gt={0}
                tour={0}
                brand={0}
                search={0}
                nozoom={1}
                application-key={applicationKey}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    pointerEvents: 'auto',
                    touchAction: 'none'
                }}
            ></matterport-viewer>
        </div>
    );
}

