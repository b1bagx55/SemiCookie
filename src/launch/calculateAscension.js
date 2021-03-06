import { setCurrentAscension } from "../redux/ascensionData/currentAscension";
import { setExtraPrestige } from "../redux/ascensionData/extraPrestige";
import watch from "redux-watch";
import { inject } from "../helpers";

export default () => {
	// Determine which ascension we are on and how much extra prestige we have
	SemiCookie.calculateAscension = () => {
		const dispatch = SemiCookie.store.dispatch;

		let currentAscension = 0;
		let prestige = Game.HowMuchPrestige(Game.cookiesReset);

		for (const { hc } of SemiCookie.state.userData.ascensions) {
			if (prestige >= hc) {
				prestige -= hc;
				currentAscension++;
			} else {
				break;
			}
		}

		dispatch(setCurrentAscension(currentAscension));
		dispatch(setExtraPrestige(prestige));
	};

	// Setup hooks to recalculate the ascensionData
	Game.registerHook("reincarnate", SemiCookie.calculateAscension);
	Game.registerHook("reset", (val) => {
		if (val) {
			Promise.resolve().then(SemiCookie.calculateAscension);
		}
	});
	inject("LoadSave", "after", SemiCookie.calculateAscension);

	const w = watch(SemiCookie.store.getState, "userData.ascensions");
	SemiCookie.store.subscribe(w(() => SemiCookie.calculateAscension));

	SemiCookie.calculateAscension();
};
