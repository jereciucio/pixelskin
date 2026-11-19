{
  outputs = { self, nixpkgs }: {
    devShells.x86_64-linux.default = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in pkgs.mkShell {
      buildInputs = with pkgs; [
        nodejs
	python3
        cairo
	freetype
	fontconfig
        pango
        libuuid
        pkg-config
        pixman
        giflib
        librsvg
      ];

      # Optional: Helps node-gyp find the libraries if it tries to build from source
      LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
        pkgs.stdenv.cc.cc.lib
        pkgs.cairo
        pkgs.pango
        pkgs.libuuid
        pkgs.fontconfig
      ];
    };
  };
}
