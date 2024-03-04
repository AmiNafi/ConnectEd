<script lang="ts">
    export let theme: string
	export let width: string
	function LightenDarkenColor(col: string, amt: number) {
		var usePound = false;
		if (col[0] == '#') {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		var b = ((num >> 8) & 0x00ff) + amt;

		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		var g = (num & 0x0000ff) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
	}
</script>

<svg
	enable-background="new 0 0 48 48"
	viewBox="0 0 48 48"
	xmlns="http://www.w3.org/2000/svg"
	width={width}
	><path
		d="m40 12h-18l-4-4h-10c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"
		fill={LightenDarkenColor(theme, -30)}
	/><path
		d="m40 12h-32c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4v-20c0-2.2-1.8-4-4-4z"
		fill={theme}
	/></svg
>
