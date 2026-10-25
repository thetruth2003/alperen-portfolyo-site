# Content and asset sources

Homepage card artwork now uses the generated illustrative covers documented in [COVER_ART.md](COVER_ART.md). The media provenance in the table below describes the original assets retained on project detail pages.

Reviewed 22 October 2026. Copy is stronger and more specific than the old template, while staying within public repository evidence and the owner's existing portfolio statements.

| Project | Evidence | Media |
|---|---|---|
| Advanced Combat System | [Public C++/ALS repository](https://github.com/thetruth2003/Advanced-combat-system--Based-on-ALS-Community-); README, CPC_Combat.cpp, LeviathanAxe.cpp | Original portfolio `axe4.gif`, optimized to a poster and click-to-play WebP. ALS Community is credited. |
| Modular Vehicle Builder | [goodboys](https://github.com/thetruth2003/goodboys); AttachPoint, DynamicCenterOfMass, HelicopterPropeller, VehicleAerodynamicSurface | Repository `Images/badpigges.gif`. Earlier BadPigges prototype linked as related work, not counted twice. |
| TENLIVION EV | [Public Flutter branch](https://github.com/thetruth2003/charge_station_app/tree/codex/flutter-prototype); README and backend contract | Actual Android demo images from commit `f6c633594463f79898367ba91ef24bc384565650`, `output/mobile/0.7.0-ekranlar/`. Demo uses mock stations/cards/payments. |
| Engine & Powertrain | [engine](https://github.com/thetruth2003/engine); Engine.cs, SimpleGearbox.cs, DifferentialSteerSplit.cs, CoolingSystem.cs, BrakeSystem.cs | Original project `engine.gif`. Unverified README claims about AAA performance, deterministic replay, tests and ABS/TCS/ESC were omitted. |
| Multiplayer Parkour | [Mutliplayer_Parkour](https://github.com/thetruth2003/Mutliplayer_Parkour); PlayerMovement, MovingPlatform, NetworkKnockbackObject, PlayerRespawn, Netcode package | Original vector system illustration, explicitly labelled. Related assignment repo is substantially overlapping and not counted separately. |
| Factory Check | [factory_app](https://github.com/thetruth2003/factory_app); README, pubspec, home-page workflow | Original `asset/factory_kroki.png` from commit `749fb4f16c1624eec92d2a7815ec8a53e295a475`. Labelled floorplan/project asset, not app screenshot. Field-test status retained. |
| Vampire | [Vampire](https://github.com/thetruth2003/Vampire); player.cs, spawner.cs, gun.cs, MainMenuController.cs | Original labelled system illustration. Repository contains no genuine gameplay screenshot. |
| Dark Descent | [Game page](https://futuregames.itch.io/darkdescent); owner's previous portfolio contribution statements | Original portfolio artwork; credited as a team project. |
| The Last Branch | [Game page](https://futuregames.itch.io/the-last-branch); owner's previous movement/flight/parkour contribution statements | Original portfolio image; team game-jam work. |
| Tower Defence | [Team repository](https://github.com/azzinoth01/EDUGameJamTeam2); owner's previous tower/wave contributions | Original portfolio screenshot. |
| Apo’nun Köyü | [Repository](https://github.com/thetruth2003/aponun_resmi_koyu-main); owner's existing project statement | Original portfolio screenshot. |
| Snake | [Correct public repository](https://github.com/thetruth2003/snake_game) | `ForReadme/1.png`, an original running prototype capture. |

## Deliberate content decisions

- Excluded private repos, empty repos, duplicated assignments, and repositories without enough descriptive evidence for a useful showcase. `hackerAgent` was not described as a security tool: it is an Unreal project, but had no substantive public description/media for this presentation.
- Removed unsupported studio/client association logos, anonymous testimonial copy, arbitrary skill percentages, template names, stale age, and unverified current internship claims.
- Kept contact identity, Warsaw location, and education from the owner's existing public portfolio. Current education status, exact dates at Futuregames, employment history, and formal degree titles should be supplied by the owner before adding a full employment CV.
- No commercial deployment, user count, performance improvement, release, or affiliation was inferred from repository ownership.
- `scripts/prepare-media.py` records exact download sources for the additional binary assets. The GitHub connector cannot download binary image resources, so the script downloads public, identified assets directly.
